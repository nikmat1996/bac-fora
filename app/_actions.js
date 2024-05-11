"use server"

import prisma from "@/lib/prisma";
import { EmailSchema } from "@/lib/schema";

console.log(prisma)
// console.log(prisma.sportevent)

export async function subscribe(state, formData){
    const result = EmailSchema.safeParse({
        email: formData.get("email")
    })

    console.log(result)

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
        console.log(newSubscription.email)
        return {
            success: newSubscription
        }
    } catch (error) {
        console.log(error)
       
        console.log("running")
        return {
            error: { email: error.message }
        }

    }

}

export async function saveContact(state, formData){
    // const result = EmailSchema.safeParse({
    //     email: formData.get("email")
    // })

    // if(result.success){
    //     await new Promise((res) => {

    //         setTimeout(() => {
    //             res()
    //         }, 2000)
    //     })
    //     return {
    //         data: result.data
    //     }
    // }

    // if(result.error){
    //     return {
    //         // error: result.error.format()
    //         error: result.error.flatten().fieldErrors
    //     }
    // }

    return {
        data: "Success"
    }

}


export async function addEvent(formData){
    console.log(process.env.DATABASE_URL)

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
            }
        });

        console.log(event)

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
    

    // const emaill = await prisma.sportevent.create({
    //     data: {
    //       email: "hello"
    //     }
    // });




   
}