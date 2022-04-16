def api_error(request_object, error_name='ERROR'):
    """ Formats HTTP error
    :param request_object: request object from making a call using requests library.
    :param error name: name for easily identifying the error incase its used for logging
    """
    nl = '\n'

    error = f'\n-----------{error_name} REQUEST--------\nHTTP/1.1 \
        {nl.join("{}: {}".format(k, v) for k, v in request_object.request.headers.items())}\n\n \
        Request Body: {request_object.request.body}'

    error += f'\n\n-----------{error_name} RESPONSE--------\nHTTP/1.1 {request_object.status_code}\n \
        {nl.join("{}: {}".format(k, v) for k, v in request_object.headers.items())}\n\nResponse Content: \
        {request_object.content.decode("utf-8")}'

    return error
