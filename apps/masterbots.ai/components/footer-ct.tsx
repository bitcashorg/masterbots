export default async function FooterCT() {
    return (
        <footer className="flex justify-center items-center opacity-50 h-[64px] ">
              <span className="font-['Geist'] text-centerb  items-center font-normal md:text-[20px]  text-md  ">Robot avatars delivered by{' '}
              <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
                robohash.org
              </a>
              {' '}
              {' • '}
              <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
              terms & policies
              </a>
              </span>
            </footer>
    )
  }