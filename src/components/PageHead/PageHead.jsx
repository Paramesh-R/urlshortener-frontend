import React from 'react'

const PageHead = ({ page_title }) => {
    return (
        <>
            {/* <!------ Page header with logo and tagline------> */}
            <header className="py-2 rounded bg-light mb-4">
                <div className="container">
                    <div className="text-center my-1">
                        <h1 className="display-4">{/* fw-bolder  */}
                            {
                                page_title
                                    ? page_title
                                    : "Page Title"
                            }
                        </h1> 
                        <p className="lead mb-0"></p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default PageHead