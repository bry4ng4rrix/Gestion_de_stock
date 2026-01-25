import { Card , CardContent } from "@/components/ui/card"

const index = () => {
  return (
    <div className='p-2  h-screen space-y-4'>
      <div className="grid grid-cols-3 gap-2">
        <Card className="h-64"></Card>
        <Card className="h-64"></Card>
        <Card className="h-64"></Card>
      </div>

      <div className="bg-white h-2/3 rounded-lg">

      </div>

    </div>
  )
}

export default index