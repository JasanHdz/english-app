interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}

function TextArea({ rows = 3, ...otherProps }: Props) {
    return (
        <textarea className="border-2 rounded-xl py-2.5 px-3 w-full outline-none appearance-none resize-none font-sans bg-gray-100" {...otherProps} rows={rows}></textarea>
    )
}

export default TextArea