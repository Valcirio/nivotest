import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { netflixProps, netflixCategoriesProps } from "@/types/netflix";

import { useRouter } from 'next/navigation'

const prisma = new PrismaClient()

export async function GET(req: Request ) {
    const { searchParams } = new URL(req.url)
    const slug: string | null = searchParams.get("slug")

    if(!slug){
        return NextResponse.json({message:'Bad Request'},{status:404})
    }
        
        const netflix_films = await prisma.netflix_titles.groupBy({
            by:["country"],
            
            _count:{
                title: true
            },
            where:{
                listed_in:{
                    contains: slug
                },
                country:{
                    not:''
                }
            }
        })
        if(!netflix_films){
            return NextResponse.json({message:'Not Found'},{status:404})
        }

    let result: netflixCategoriesProps = {
        categorie: slug,
        countFilms: 0
    }
    netflix_films.map(el=>{
        if(el._count.title > 100 && !(el.country?.includes(','))){
            result.countFilms += el._count.title
        }
    })

    return NextResponse.json({message:'Sucsess', data: result},{status:200})
}