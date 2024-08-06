import BlogItem from "./components/BlogItem";
import HeaderNav from "./components/HeaderNav";
import { Blog } from "./utils/@types";


const randomBlogs: Blog[] = [
  {
    author: "Jane Doe",
    title: "The Future of Technology",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos omnis eligendi voluptas maiores harum reiciendis esse obcaecati adipisci, impedit aspernatur. Necessitatibus consectetur facere facilis quidem similique ad nostrum alias omnis.",
    createAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-10')
  },
  {
    author: "John Smith",
    title: "Healthy Living Tips",
    content: "Incorporating small changes can significantly improve your health.",
    createAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-20')
  },
  {
    author: "Emily Johnson",
    title: "Traveling on a Budget",
    content: "Traveling doesn't have to be expensive if you know the right tips.",
    createAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-18')
  },
  {
    author: "Michael Brown",
    title: "The Importance of Mental Health",
    content: "Mental health is just as important as physical health.",
    createAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-12')
  },
  {
    author: "Linda Davis",
    title: "Top 10 Coding Languages",
    content: "Learn about the top coding languages you should know.",
    createAt: new Date('2023-05-22'),
    updatedAt: new Date('2023-05-29')
  },
  {
    author: "James Wilson",
    title: "Investing for Beginners",
    content: "A guide to help beginners start investing.",
    createAt: new Date('2023-06-14'),
    updatedAt: new Date('2023-06-21')
  },
  {
    author: "Patricia Garcia",
    title: "Eco-Friendly Living",
    content: "Tips for living a more sustainable and eco-friendly life.",
    createAt: new Date('2023-07-03'),
    updatedAt: new Date('2023-07-11')
  },
  {
    author: "Robert Martinez",
    title: "Understanding Blockchain",
    content: "An introduction to blockchain technology and its applications.",
    createAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-08-27')
  },
  {
    author: "Mary Rodriguez",
    title: "Cooking with Fresh Ingredients",
    content: "The benefits of cooking with fresh, local ingredients.",
    createAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-22')
  },
  {
    author: "Charles Lee",
    title: "Fitness Routines for Busy People",
    content: "How to stay fit even with a busy schedule.",
    createAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-08')
  }
]

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <HeaderNav />
      <div className="py-4 px-8">
        <div className="">
         
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {randomBlogs.map((data)=>(
            <BlogItem blog={data}  />
          ))}
        </div>

      </div>
    </main>
  );
}
