const WidgetContent = (props) => {
    return (
        <div className="flex flex-col cursor-pointer">
            {props.items.map(item => (
                <div key={item.original_title} className="widgetContent">
                    <img className="w-11 h-11 rounded-full" src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
                    <div className="ml-3">
                        <h5 className="text-gray-800 text-semibold">{item.original_title}</h5>
                        <p className="text-gray-400 text-sm">{item.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WidgetContent;