import InvitationForm from "@/components/invitation-form"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Invitation Card Generator</h1>
      <InvitationForm />
    </main>
  )
}
