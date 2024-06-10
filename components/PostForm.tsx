"use client"

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ImageIcon, XIcon } from "lucide-react"
import { useRef, useState } from "react"
import createPostAction from "@/actions/createPostAction"
import { toast } from "sonner"

function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const { user } = useUser()
  
  const firstName = user?.firstName
  const lastName = user?.lastName
  const imageUrl = user?.imageUrl

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if(file){
      setPreview(URL.createObjectURL(file))
    }
  }

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData

    const text = formDataCopy.get("postInput") as string

    if(!text.trim()){
      throw new Error("You must provide a post input")
    }

    setPreview(null)

    try {
      await createPostAction(formDataCopy)
      formRef.current?.reset()
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  return (
    <div>
      {/* handle form sub with server action and toast notification based on the promise above */}
      <form action={ formData => {
        // handle form sub with server action
        const promise = handlePostAction(formData)
        
        // toast notif based on the promise above
        toast.promise( promise, {
          loading: "Creating post...",
          success: "Post created",
          error: "Failed to create post"
        } )
      } } ref={ formRef } className="p-3 bg-white rounded-lg border">
        <div className="flex items-center space-x-2">
          <Avatar>
            { user?.id ? (
              <AvatarImage src={ imageUrl } />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            ) }
            
              <AvatarFallback>{ firstName?.charAt(0) } { lastName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <input type="text" name="postInput" placeholder="Start writting a post..." className="flex-1 outline-none rounded-full py-3 px-4 border" />

          <input ref={ fileInputRef } type="file" name="image" accept="image/*" hidden onChange={ handleImageChange } />

          <Button type="submit" variant="secondary" className="rounded-full scale-110" >Post</Button>
        </div>

        {/* Preview conditional check */}
        { preview && (
          <div className="mt-3">
            <img src={ preview } alt="Preview" className="w-full object-cover" />
          </div>
        ) }

        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" variant={ preview ? "secondary" : "outline" } onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            { preview ? "Change" : "Add" } image
          </Button>
          {/* Add remove preview button */}
          
          { preview && (
            <Button variant="outline" type="button" onClick={ () => {
              setPreview(null);
              fileInputRef.current!.value = ""} }>
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          ) }
        </div>
      </form>

      <hr className="my-2" />
    </div>
  )
}

export default PostForm