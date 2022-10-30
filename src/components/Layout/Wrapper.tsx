interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {

}


function Wrapper({ children, className, ...otherProps }: Props) {
  return (
    <div {...otherProps} className={`${className} px-4 py-6`}>{children}</div>
  )
}

export default Wrapper