import AppHeader from '../app-header';
import { Routes, Route } from 'react-router-dom';
import { MainPage, BoardPage } from '../pages';
import './app.scss';

// Роутером делим приложение на 2 страницы: главную и страницу текущей доски по ее ID,
// который берем из сегмента пути и сохраняем в параметрах роутера
function App() {
  return (
    <div className="App">
      <div className="container">
        <AppHeader/>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/board_:boardId' element={<BoardPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;