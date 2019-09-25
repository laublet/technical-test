import launchScript from '@/components/script/script.controller';


class Response {
  status(status) {
      this.status = status

      return this
  }

  json(data) {
      return data
  }
}

describe('The script controller', () => {
  it('should return something', async () => {
    const req = {}
    const res = new Response()

    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    await launchScript(req, res)
    expect(statusSpy).toHaveBeenCalledWith(200)
  });
});
