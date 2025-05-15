import * as motion from "motion/react-client"

export const Main = ({children}) => {
  return <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 2,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    }}
    className="h-[100vh] w-full text-white flex justify-center items-center"
  >
    {children}
  </motion.div>;
};
