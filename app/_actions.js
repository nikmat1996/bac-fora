"use server"

import prisma from "@/lib/prisma";
import { EmailSchema, ContactSchema } from "@/lib/schema";
import { revalidatePath } from 'next/cache'
// console.log(prisma)
// console.log(prisma.sportevent)

export const getEvents = async () => {
    try {
        const events = await prisma.sportevent.findMany()
        return { events }
    } catch (error) {
        return { error }
    }
}

export async function subscribe(state, formData){
    const result = EmailSchema.safeParse({
        email: formData.get("email")
    })

    // console.log(result)

    if(result.error){
        return {
            // error: result.error.format()
            error: result.error.flatten().fieldErrors
        }
    }

    try {
        // const res = await sql`INSERT INTO subscriptions (email) VALUES (${result.data.email}) RETURNING id`
        const newSubscription = await prisma.subscription.create({
            data: {
              email: result.data.email
            }
          });
        // console.log(newSubscription.email)
        return {
            success: newSubscription
        }
    } catch (error) {
        // console.log(error)
       
        // console.log("running")
        return {
            error: { email: error.message }
        }

    }

}

export async function deleteEvent(state, formData){
    const id = formData.get("id")
    const password = formData.get("password")
    console.log(password)
    console.log(id)

    if(!id){
        return {
            error: {
                message: "id not found"
            }
        }
    }

    if(formData.get('password') !== process.env.PASSWORD){
        return {
            error: {
                message: "Wrong Password"
            }
        }
    }

    try {
        const deletedEvent = await prisma.sportevent.delete({
          where: {
            id: parseInt(id)
          }
        });
        console.log('Deleted event:', deletedEvent);
        revalidatePath("/delete")


        return {
            success: "Deleted."
        }
      } catch (error) {
        console.log(error)
        return {
            error: {
                message: "prisma error or db error"
            }
        }
      }

}

export async function saveContact(state, formData){
    const result = ContactSchema.safeParse({
        name: formData.get("name"),
        age: formData.get("age"),
        gender: formData.get("gender"),
        mobile: formData.get("mobile"),
        address: formData.get("address"),
        email: formData.get("email")
    });

    if(result.error){
        return {
            error: result.error.flatten().fieldErrors
        };
    }
    console.log(result.data)

    const userData = {
        name: result.data.name,
        age: result.data.age ? parseInt(result.data.age) : undefined,
        gender: result.data.gender || null,
        mobileNumber: result.data.mobile || null,
        address: result.data.address || null,
        email: result.data.email,
    };

    try {
        // Here you would save the contact data to your database or perform any other necessary actions
        // For example:
        await prisma.$transaction(async (prisma) => {
            // Ensure the subscription exists
            await prisma.subscription.upsert({
              where: { email: result.data.email },
              update: {},
              create: { email: result.data.email },
            });
      
            // Now create the user
            const newUser = await prisma.user.create({ data: userData });
            console.log('User created:', newUser);
          });


        // If the saving operation is successful, you can return the saved data or a success message
        // return {
        //     success: newContact
        // };

        // For now, let's assume the operation was successful and return a success message
        return {
            data: "Success",
            success: "Contact saved successfully"
        };
    } catch (error) {
        // If an error occurs during the operation, return an error message
        console.log(error)
        return {
            data: "Failed",
            error: { database: error.message }
        };
    }
}


export async function addEvent(formData){
    // console.log(process.env.DATABASE_URL)

    if(formData.get('password') !== process.env.PASSWORD){
        return {
            error: {
                message: "Wrong Password"
            }
        }
    }

    try {
        const event = await prisma.sportevent.create({
            data: {
                sport: formData.get('sport'),
                date: new Date(formData.get('date')).toISOString(),
                time: formData.get('time'),
                gender: formData.get('gender'),
                category: formData.get('category'),
                price: parseFloat(formData.get('price')), 
                address: formData.get('address'),
                phone: formData.get('phone'),
                url: formData.get('url'),
                locationUrl: formData.get('locationUrl'),
                age9_12: formData.get('age9_12') == "true" ? true: false,
                age12_15: formData.get('age12_15')  == "true" ? true: false,
                age15_18: formData.get('age15_18')  == "true" ? true: false,
                age18_30: formData.get('age18_30')  == "true" ? true: false,
                age30_: formData.get('age30_')  == "true" ? true: false
            }
        });
        revalidatePath("/delete")

        return {
            success: {
               event
            }
        }
    } catch (error) {
        console.log(error?.message)
        return {
            error: {
                message: error?.message
            }
        }
    }
}