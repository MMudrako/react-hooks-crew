'use client'

import { useEffect } from 'react';

export default function FontDebug() {
    useEffect(() => {
        const bannerFont = getComputedStyle(document.documentElement).getPropertyValue('--font-banner');
        console.log('Font Banner Var:', bannerFont);
    }, []);

    return null;
}
