export default async function Page({ params }: { params: { event_id: string } }) {

    return(
        <>
            {params.event_id}
        </>
    )
}