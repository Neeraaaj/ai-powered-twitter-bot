import React, { useState } from 'react'
import { Button } from '../ui/button'

const CopyLabel = ({text} : {text: string}) => {
    const [label, setLabel] = useState('copy');
    const copyToClipboard = async(text: string) => {
        try{
            await navigator.clipboard.writeText(text);
        }catch(err){
            console.log("Failed to copy the text: ", err);
            
        }
    }

    const handleCLick = () => {
        copyToClipboard(text);
        setLabel('copied');  
    }
    return (
    <Button onClick={handleCLick} variant={'outline'} className='text-sm text-muted-foreground bg-background my-0 h-auto rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:bg-primary hover:text-primary-foreground pb-0.5 pt-0'>
        {label}
    </Button>
  )
}

export default CopyLabel