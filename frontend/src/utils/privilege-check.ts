export const PrivilegeCheck: any = (check_value: any, navigate: any) => {
  console.log("check_value", check_value);
  if (check_value) {
    console.log("approved show");
  } else {
    navigate("/error");
  }
};
