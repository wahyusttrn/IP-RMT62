export function TCh1({ children, className }) {
  return (
    <h1
      className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${
        className ? className : ''
      }`}
    >
      {children}
    </h1>
  );
}

export function TCh2({ children, className }) {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className ? className : ''}`}>
      {children}
    </h2>
  );
}

export function TCh3({ children, className }) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className ? className : ''}`}>{children}</h3>
  );
}

export function TCh4({ children, className }) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className ? className : ''}`}>{children}</h4>
  );
}

export function TCp({ children, className }) {
  return <p className={`leading-7 [&:not(:first-child)]:mt-1 ${className ? className : ''}`}>{children}</p>;
}

export function TCHeader({ children }) {
  return <h1 className="scroll-m-20 pb-2 sm:text-5xl text-3xl font-semibold tracking-tight first:mt-0">{children}</h1>;
}
