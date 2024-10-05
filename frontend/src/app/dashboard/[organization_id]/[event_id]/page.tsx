export default async function Page({ params }: { params: { event_id: string } }) {

    return(
        <div className={''}>
            this is in the [event_id] route btw - it will match anything that isnt a route already
            <div className={'text-2xl'}>
             {params.event_id}
            </div>
        </div>
    )
}