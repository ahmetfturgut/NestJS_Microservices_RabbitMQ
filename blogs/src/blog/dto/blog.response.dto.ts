import { Blog } from "../blog.model"

export class GetBlogResponseDto {
    id: Blog["id"];
    title: Blog["title"];
    content: Blog["content"];
    image: Blog["image"];
    author: Blog["author"];
    categories: Blog["categories"];
    tags: Blog["tags"];
}