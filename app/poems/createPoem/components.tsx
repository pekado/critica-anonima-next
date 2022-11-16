'use client'
import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'

interface BaseProps {
    className: string
    [key: string]: unknown
}
type OrNull<T> = T | null

export const Icon = React.forwardRef(
    (
        { iconName, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLImageElement>>
    ) => (

        <Image width={8} height={18} className={''} src={`/${iconName}.svg`} alt={''} />


    )
)

export const Button = React.forwardRef(
    (
        {
            className,
            active,
            reversed,
            ...props
        }: PropsWithChildren<
            {
                active: boolean
                reversed: boolean
            } & BaseProps
        >,
        ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
        <div
            {...props}
            ref={ref as React.RefObject<HTMLDivElement>}
            className={
                className
            }
        />
    )
)

export const Menu = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <div
            {...props}
            ref={ref as React.RefObject<HTMLDivElement>}
            className={
                className}
        />
    )
)


export const Portal = ({ children }: any) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}