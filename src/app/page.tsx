import BarGraph from '@/components/barGraph'
import PieGraph from '@/components/pieGraph';
import { netflixCategoriesProps } from '@/types/netflix';
import axios from 'axios'
import Image from 'next/image';

export default async function Home() {
  const dataFilmByCountry = await axios.get('http://localhost:3000/api/netflix')

  const slugKey = ['Comedies','Dramas','TV Shows','International Movies']

  const Comedies = await axios.get(`http://localhost:3000/api/netflix/categories?slug=${slugKey[0]}`)
  const Dramas = await axios.get(`http://localhost:3000/api/netflix/categories?slug=${slugKey[1]}`)
  const TVShows = await axios.get(`http://localhost:3000/api/netflix/categories?slug=${slugKey[2]}`)
  const IntMovies = await axios.get(`http://localhost:3000/api/netflix/categories?slug=${slugKey[3]}`)
  let dataFilmByCategories: netflixCategoriesProps[] = []
  dataFilmByCategories.push(Comedies.data.data)
  dataFilmByCategories.push(Dramas.data.data)
  dataFilmByCategories.push(TVShows.data.data)
  dataFilmByCategories.push(IntMovies.data.data)

    // slugKey.map(async (slug)=>{
    //   await axios.get(`http://localhost:3000/api/netflix/categories?slug=${slug}`)
    // })

  return (
    <main className="flex h-screen flex-col items-start justify-between p-6 bg-red-600/10">
      <header className='flex justify-start items-center gap-2'>
        <Image width={40} height={40} src="/netflix.svg" alt='netflixLogo'/>
        <h1 className='text-2xl font-medium'>DashBoard</h1>
      </header>
      <section className='w-full flex flex-row items-start justify-between p-6'>

        <div className='w-fit h-auto border-2 border-[#444444/25] rounded-md shadow-xl flex flex-col items-center bg-white/25'>
          <p className='pt-2 text-sm'>Filmes e Séries em relação ao País</p>
          <BarGraph data={dataFilmByCountry.data.data}/>
        </div>

        <div className='w-fit h-auto border-2 border-[#444444/25] rounded-md shadow-xl flex flex-col items-center bg-white/25'>
        <p className='pt-2 text-sm'>Filmes e Séries de cada Categoria</p>
            <PieGraph data={dataFilmByCategories}/>
        </div>
      </section>
    </main>
  );
}