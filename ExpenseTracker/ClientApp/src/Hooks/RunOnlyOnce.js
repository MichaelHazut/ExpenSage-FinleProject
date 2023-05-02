import { useEffect } from 'react';

export function RunOnlyOnce(func){
    useEffect(func,[])
}