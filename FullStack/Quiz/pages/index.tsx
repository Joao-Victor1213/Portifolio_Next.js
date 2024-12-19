
import { useRouter } from "next/navigation";
import  Styles  from '@/styles/index.module.css';

export default function Home() {
  const router = useRouter()

  return (
    <main className={Styles.main}>
      <h1 className={Styles.titulo}>Quiz 10</h1>
      <button className={Styles.botaoComecar} onClick={()=>{router.push('./quizApp')}}> Começar</button>
    </main>
  );
}
