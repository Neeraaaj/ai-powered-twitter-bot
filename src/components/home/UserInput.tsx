'use client'

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import MetaIcon from '../icons/Meta'
import MistralIcon from '../icons/Mistral'
import { Slider } from '../ui/slider'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Info, Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { log } from 'console'
import { generateBio } from '@/app/action'
import { BioContext } from '@/context/BioContext'

const formSchema = z.object({
    model: z.string().min(1, 'Model is required'),
    temperature: z.number().min(0, 'Temperature must be atleast 0').max(2, 'Temperature must be atmost 1'),
    content: z.string().min(50, "Content should atleast have 50 characters.").max(500, "Content should not exceed 500 character limit."),
    type: z.enum(['personal', 'brand'], {
        errorMap: () => ({message: "Type is required"})
    }),
    tone: z.enum(['professional', 'casual', 'sarcastic', 'funny', 'passionate', 'thoughtful'], {
        errorMap: () => ({message: "Tone is required"})
    }),
    emojis: z.boolean()
})

const UserInput = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: 'llama3-8b-8192',
            temperature: 1,
            content: "",
            type: 'personal',
            tone: 'professional',
            emojis: false,
        }
    });

    const {setLoading, loading, setOutput } = useContext(BioContext);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        setLoading(true)
        
        const userInputValues = `
        User Input: ${values.content},
        Bio Tone: ${values.tone},
        Bio Type: ${values.type},
        Add Emojis: ${values.emojis}
        `

        try{
            const { data } = await generateBio(userInputValues, values.temperature, values.model)
            // console.log(data);
            setOutput(data);
            setLoading(false);
        }catch(e){
            console.log(e);
            setLoading(false);
        }
    }
  return (
    <div className='relative flex flex-col items-start gap-8'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
               <fieldset className='grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm'>
                <legend>Settings</legend>
                <div className='grid gap-3'>
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Model" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="llama3-8b-8192">
                                    <div className="flex items-start gap-5 text-muted foreground">
                                        <MetaIcon className="size-5"/>
                                        <div className='flex gap-10'>
                                            <p className='text-gray-400 font-bold'>
                                                <span className='text-black font-extrabold'>
                                                    Llama 
                                                </span>
                                                3
                                            </p>
                                        </div>
                                    </div>
                                </SelectItem>
                                <SelectItem value="mixtral-8x7b-32768">
                                    <div className="flex items-start gap-3 text-muted foreground">
                                        <MistralIcon className="size-5"/>
                                        <div>
                                            <p className='text-gray-400'>
                                                <span className='text-black font-extrabold'>
                                                    Mistral 
                                                </span>
                                                8x7b
                                            </p>
                                        </div>
                                    </div>
                                </SelectItem>
                                <SelectItem value="llama3-70b-8192">
                                    <div className="flex items-start gap-3 text-muted foreground">
                                        <MetaIcon className="size-5"/>
                                        <div>
                                            <p className='text-gray-400'>
                                                <span className='text-black font-extrabold'>
                                                    Llama 
                                                </span>
                                                70b
                                            </p>
                                        </div>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className='grid gap-3'>
                <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field: {value, onChange} }) => (
                        <FormItem>
                            <FormLabel className='flex items-center justify-between pb-2'>
                                <span className='flex items-center justify-center'>Creativity
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className='h-4 w-4 ml-1 cursor-pointer'/>
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={25} collisionPadding={20} className='max-w-sm'>
                                    <p>A higher setting produces more creative and surprising bios, while a lower setting sticks to more predictable and conventional styles.</p>
                                    </TooltipContent>
                                </Tooltip>

                                </span>
                                <span>{value}</span>
                            </FormLabel>
                        <FormControl>
                            <Slider defaultValue={[1]} min={0} max={2} step={0.1} onValueChange={(value) => onChange(value[0])}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
               </fieldset>

               <fieldset className='grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm'>
                    <legend className='ml-1 px-1 text-sm font-medium'>
                        User Input
                    </legend>
                    <div className='grid gap-3'>
                    <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center justify-between pb-2'>
                                About yourself
                            </FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder='Add your old twitter bio or write few sentences about yourself' className='min-h-[10rem]' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>


                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center justify-between pb-2'>
                                Type
                            </FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                
                                <SelectItem value="personal">
                                    Personal
                                </SelectItem>
                                <SelectItem value="brand">
                                    Brand
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>
                                Tone
                            </FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="sarcastic">Sarcastic</SelectItem>
                                <SelectItem value="funny">Funny</SelectItem>
                                <SelectItem value="passionate">Passionate</SelectItem>
                                <SelectItem value="thoughtful">Thoughtful</SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>

                    <div className='grid gap-3'>
                        <FormField
                            control={form.control}
                            name="emojis"
                            render={({ field }) => (
                                <FormItem className='flex items-center'>
                                    <FormLabel className='text-sm mr-4'>
                                        Add Emojis
                                    </FormLabel>
                                <Switch checked={field.value}
                                    onCheckedChange={field.onChange} className='!my-0'/>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
               </fieldset>

               <Button className='rounded' type='submit' disabled={loading}>{loading && <Loader2 className='w-4 h-4 mr-2 animate-spin'/>} Generate</Button>
            </form>
        </Form>
    </div>
  )
}

export default UserInput