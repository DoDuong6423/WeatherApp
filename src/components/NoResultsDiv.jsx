export default function NoResultsDiv() {
  return (
    <div className="no-results">
      <img
        src="../../icons/no-result.svg"
        alt="No results found"
        className="icon"
      />
      <h3 className="title">Đã xảy ra lỗi</h3>
      <p className="message">
        Chúng tôi không thể lấy được thông tin thời tiết. Hãy đảm bảo rằng bạn
        đã nhập đúng tên thành phố hoặc thử lại sau.
      </p>
    </div>
  );
}
