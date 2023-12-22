

export class GetBlogResponseDto {
    id: string; 
}


export class CreateBlogResponseDto {
    id: string
    title: string
    content: string
    image: string
    categories: string[]
    tags: string[]
}

export class UpdateBlogResponseDto {
    id: string
    title: string
    content: string
    image: string
    categories: string[]
    tags: string[]
}