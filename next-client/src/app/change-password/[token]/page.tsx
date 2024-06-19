export default function Page({ params }: { params: { token: string } }) {
    return <div>My Post: {params.token}</div>
  }