
describe('Check the  registration is ok or not', () => {
    it('should registration is correctly', () => {

        console.log(screen.debug())

        const elem = screen.getByRole('heading')


        expect(elem).toBeInTheDocument()

    })


})