
import bcrypt from 'bcrypt'

export const hashPassword = (plainText: string): string => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(plainText, salt)
  return hash
}

export const comparePassword = (password: string, encrypted: string): boolean => {
  return bcrypt.compareSync(password, encrypted)
}

export function getSqlLimitFragment(pageIndex: any, pageSize: any): any {
  if (pageSize && Number.isNaN(Number(parseInt(pageSize, 10)))) {
    throw new Error('pageSize must be a number')
  }

  if (pageSize && pageSize > 200) {
    throw new Error('pageSize cannot exceed 200 per request')
  }

  let fragment = ''
  if (pageSize) {
    fragment = ` limit ${pageSize}`

    if (pageIndex) {
      const offset = (pageIndex - 1) * pageSize
      fragment += ` offset ${offset}`
    }
  }
  return fragment
}

export function getSqlSortFragment(sortBy: any, sortDirection: any): any {
  let sqlSort = ''
  sortDirection = sortDirection ? sortDirection.toUpperCase().trim() : null

  if (sortDirection && ['DESC', 'ASC', 'NONE'].indexOf(sortDirection) < 0) {
    sortDirection = 'NONE'
  }

  if (sortBy && sortBy.includes(',') && sortDirection && sortDirection !== 'NONE') {
    sortBy = sortBy.split(',')
  }
  if (sortBy && sortDirection && sortDirection !== 'NONE') {
    sqlSort += ` order by ${sortBy}`
  }
  if (sortDirection && sortDirection !== 'NONE' && sqlSort) {
    sqlSort += ` ${sortDirection}`
  }
  return sqlSort
}
