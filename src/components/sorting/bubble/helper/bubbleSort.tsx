import React from 'react';

//How bubble sort works ? 
//Hrv: Prva iteracija, pronalazi se mjesto za prvi najveci element
// Druga iteracija, pronalazi se mjesto za drugi najveci element itd...
// Zbog toga se u drugoj for petlji ide do length-i-1 jer nakon sto pronademo mjesto za prvi najveci element on nas vise ne zanima
export const bubbleSort=(items:number[])=>{
    var length = items.length;
    for (let i = 0; i < length; i++) { 
        for (let j = 0; j < (length - i - 1); j++) { 
            if(items[j] > items[j+1]) {
                var temp = items[j]; 
                items[j] = items[j+1];
                items[j+1] = temp; 
            }
        }        
    }
    return items;
}