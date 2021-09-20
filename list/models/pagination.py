from furl import furl

class pagination:
    limit = 20
    next = 0
    prev = 0
    nextPage = None
    prevPage = None
    total = 0
    current = 0

    """
    page = the current page
    total = total element available, not only total returned
    """
    def __init__(self, page, total):
        self.current = page
        if total > (page * self.limit):
            self.next = page + 1
        if page > 1 and total != 0:
            self.prev = page - 1
        self.total = total

    """
    url = the current endpoint the user called
    """
    @staticmethod
    def link(url, page, total):
        pgn = pagination(page, total)
        if pgn.next != 0:
            pgn.nextPage = furl(url).add({'page': pgn.next}).__str__()
        if pgn.prev != 0:
            pgn.prevPage = furl(url).add({'page': pgn.prev}).__str__()
        return pgn



