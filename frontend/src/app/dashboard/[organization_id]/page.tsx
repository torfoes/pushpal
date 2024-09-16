import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {PlusCircle, UserPlus} from "lucide-react";
import {Organization} from "@/types";



async function getOrganization(organization_id : string): Promise<Organization> {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('authjs.session-token')?.value;

    if (!sessionToken) {
        redirect('/login')
    }

    const res = await fetch(`http://localhost:3000/organizations/${organization_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch organization', errorDetails);
        throw new Error(`Failed to fetch organization: ${res.status}`);
    }

    return res.json();
}

export default async function Page({ params }: { params: { organization_id: string } }) {
    const organization = await getOrganization(params.organization_id);

    // console.log(organization);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{organization.name} Dashboard</h1>
            <p className="text-lg mb-6">Members: {organization.member_count} | Organization ID: {organization.id}</p>

            <Tabs defaultValue="dashboard" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Message</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/*{notifications.map((notification) => (*/}
                                        {/*    <TableRow key={notification.id}>*/}
                                        {/*        <TableCell>{notification.date}</TableCell>*/}
                                        {/*        <TableCell>{notification.message}</TableCell>*/}
                                        {/*    </TableRow>*/}
                                        {/*))}*/}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Notification
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Members ({organization.member_count})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/*{members.map((member) => (*/}
                                        {/*    <TableRow key={member.id}>*/}
                                        {/*        <TableCell>{member.name}</TableCell>*/}
                                        {/*        <TableCell>{member.email}</TableCell>*/}
                                        {/*        <TableCell>{member.role}</TableCell>*/}
                                        {/*    </TableRow>*/}
                                        {/*))}*/}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Invite New Member
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-4">Invite New Member</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite New Member</DialogTitle>
                            </DialogHeader>
                            <form  className="space-y-4">
                                {/*<div>*/}
                                {/*    <Label htmlFor="email">Email</Label>*/}
                                {/*    <Input*/}
                                {/*        id="email"*/}
                                {/*        type="email"*/}
                                {/*        value={newMemberEmail}*/}
                                {/*        onChange={(e) => setNewMemberEmail(e.target.value)}*/}
                                {/*        required*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <Button type="submit">Send Invitation</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </TabsContent>

                <TabsContent value="events">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/*<form onSubmit={handleCreateEvent} className="space-y-4">*/}
                            {/*    <div>*/}
                            {/*        <Label htmlFor="eventTitle">Event Title</Label>*/}
                            {/*        <Input*/}
                            {/*            id="eventTitle"*/}
                            {/*            value={newEvent.title}*/}
                            {/*            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <Label htmlFor="eventDescription">Event Description</Label>*/}
                            {/*        <Textarea*/}
                            {/*            id="eventDescription"*/}
                            {/*            value={newEvent.description}*/}
                            {/*            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <Label htmlFor="eventDate">Event Date</Label>*/}
                            {/*        <Input*/}
                            {/*            id="eventDate"*/}
                            {/*            type="date"*/}
                            {/*            value={newEvent.date}*/}
                            {/*            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <Button type="submit">Create Event</Button>*/}
                            {/*</form>*/}
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/*{events.map((event) => (*/}
                                    {/*    <TableRow key={event.id}>*/}
                                    {/*        <TableCell>{event.title}</TableCell>*/}
                                    {/*        <TableCell>{event.description}</TableCell>*/}
                                    {/*        <TableCell>{event.date}</TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}