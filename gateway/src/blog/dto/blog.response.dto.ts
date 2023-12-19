

export class GetBlogResponseDto {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
}


export class CreateBlogResponseDto {
    id: string
    title: string
    content: string
    image: string
    categories: string[]
    tags: string[]
}