const LineBreak = ({children}) => {
    return <div className="flex items-center justify-center gap-3">
        <hr className="h-px border border-slate-200 grow"/>
        {children}
        <hr className="h-px border border-slate-200 grow"/>
    </div>
};

export default LineBreak;