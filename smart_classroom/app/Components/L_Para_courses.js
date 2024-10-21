import React from 'react'

const L_Para_courses = (props) => {

    return (
        <div className="card_para my-6 border-green-400 hover:border-2 rounded-xl px-3 py-1 transition-all group">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold my-3">{props.heading}</h2>
                {/* <div className="flex gap-3 mx-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button>
                        <FileEditIcon />
                    </button>
                    <button>
                        <Delete03Icon />
                    </button>
                </div> */}
            </div>
            <p className="mb-2">{props.paragraph}</p>
        </div>

    )
}

export default L_Para_courses
