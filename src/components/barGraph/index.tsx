'use client'

import { netflixProps } from '@/types/netflix'
import { Bar } from '@nivo/bar'

type barProps = {
    data: netflixProps[]
}


const MyBar = ({data}:{data:netflixProps[]}) => (
    <Bar
        data={data}
        indexBy="countryFilm"
        keys={[
            "countFilms"
        ]}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: false }}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        width={1000}
        height={600}
        groupMode="grouped"
        colors={{ scheme: 'reds' }}
        colorBy='indexValue'
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Países ',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Filmes',
            legendPosition: 'middle',
            legendOffset: -50,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableTotals={true}
        labelTextColor={{ theme: 'background' }}
        motionConfig="gentle"
    />)
    
export default function BarGraph({data}:barProps){
    return(
        <MyBar data={data} />
    )
}