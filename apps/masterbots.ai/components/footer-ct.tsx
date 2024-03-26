export default  function FooterCT() {
    return (
        <footer className="flex justify-center items-center opacity-50 h-[64px] ">
              <span className="font-['Geist_Mono'] text-centerb  items-center font-normal md:text-[12px]  text-md  ">Robot avatars delivered by{' '}
              <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary mr-2  underline focus-within:underline">
                robohash.org
              </a>
              <a href="/terms-n-policies"  className="text-primary underline focus-within:underline">
                 • terms & policies
              </a>
              </span>
            </footer>
    )
  }