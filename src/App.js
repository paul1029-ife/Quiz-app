import QuizCard from './components/QuizCard';

function App() {
  return (
   <div className="items-center flex flex-col gap-5 justify-center h-[100vh] w-full">
    <h1 className="font-extrabold text-4xl">Quiz Application</h1>
    <QuizCard />
   </div>
  );
}

export default App;
