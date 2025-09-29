"use client"

import React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import testimonials from '@/data/testimonial'
import { Card,CardContent} from "@/components/ui/card"


export const Testimonial = () => {
    return <div>
        <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">What our writer's say</h2>
        <Carousel
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
            >
                <CarouselContent className="mb-20">
                    {
                        testimonials.map((testimonial, index)=>(
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="shadow-lg">
                                    <CardContent>
                                        <blockquote>
                                            <p className="text-orange-700 italic text-center mb-5">&quot;{testimonial.text}&quot;</p>
                                            <footer className="text-center">
                                                <div className="font-semibold">{testimonial.author}</div>
                                                <div className="text-sm text-orange-900">{testimonial.role}</div>
                                            </footer>
                                        </blockquote>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
        </Carousel>
    </div>
}