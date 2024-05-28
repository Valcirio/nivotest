import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { error } from "console";
import { netflixProps } from "@/types/netflix";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {

    const netflix_films = await prisma.netflix_titles.groupBy({
        by:["country"],
        _count:{
            title: true
        },
        where:{
            country:{
                not:''
            }
        }
    })

    const result: netflixProps[] = []
    netflix_films.map(el=>{
        if(el._count.title > 100 && !(el.country?.includes(','))){

            const obj: netflixProps = {
                countryFilm: el.country ? el.country : '',
                countFilms: el._count.title
            }
            result.push(obj)
        }
    })

    if(!netflix_films){
        return NextResponse.json({message:'Not Found'},{status:404})
    }
    return NextResponse.json({message:'Sucsess', data: result},{status:200})
}