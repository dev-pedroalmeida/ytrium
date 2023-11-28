import React from 'react'
import { cx, css } from '@emotion/css'


export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    },
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
)

export const Icon = React.forwardRef(
  (
    { className, ...props }, ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 20px;

          vertical-align: text-bottom;
        `
      )}
    />
  )
)


export const Menu = React.forwardRef(
  (
    { className, ...props }, ref
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)

export const Toolbar = React.forwardRef(
  (
    { className, ...props }, ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: sticky;
          top: 0;
          margin: 20px 0;
          padding: 16px 8px;
          border-bottom: 2px solid #eee;
          background-color: #fff;
          z-index: 1;
        `
      )}
    />
  )
)