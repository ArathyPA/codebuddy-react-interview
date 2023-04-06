import './Pages.css';

const Pages = ({ setStep }) => {
  const pageNumberList = [1, 2, 3];
  return (
    <div>
      <ul className="pageList">
        {pageNumberList.map(number => (
          <li key={number} className="pageNumber">
            <button type="button" className="pageLink" onClick={() => setStep(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pages;
