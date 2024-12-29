import image from '../../../../assets/images/boy_celeb.png';
function OwnerAccountVerified() {
    return (
        <div className="text-center px-4 my-10">
            <img src={image} alt="" className='w-64 h-64 object-contain mx-auto' />
            <h2 className="text-xl md:text-2xl font-bold">Congratulations!</h2>
            <p>Your account is all setup and ready to host vehicles.</p>
        </div>
    )
}

export default OwnerAccountVerified