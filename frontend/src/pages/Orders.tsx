import useUserValidator from "../hooks/useUserValidator";

function Orders() {
  useUserValidator()

  return (
    <div>This is orders page</div>
  )
}

export default Orders