function Episode() {
  return (
    <div>
      <span className="block text-lg lg:text-3xl mb-4">Episodes</span>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Air Date</th>
              <th>Episode</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>Earth (Replacement Dimension)</th>
              <td>December 9, 2013</td>
              <td>S01E02</td>
              <td>{new Date("2017-11-05T10:24:38.089Z").toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Episode;
