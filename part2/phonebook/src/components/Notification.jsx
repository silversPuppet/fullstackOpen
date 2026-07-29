const Notification = ({ message, isUpdate }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isUpdate ? "update" : "error"}>
      {message}
    </div>
  )
}

export default Notification