export default function RichText({ html }: { html: string }) {
    return <div className='prose' dangerouslySetInnerHTML={{ __html: html }} />;
}
