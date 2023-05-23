import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
type RichTextProps = {
    value?:string,
    onChange:(value:string)=>void
}
export default function RichText({value,onChange}:RichTextProps) {
  return (
    <ReactQuill
    onChange={onChange}
    value={value}
    theme="snow"
    className="border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
  />
  )
}
