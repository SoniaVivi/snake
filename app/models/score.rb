class Score < ApplicationRecord
  validates :points, length: {in: 1..289}
  validates :name, length: {in: 3..32}
end
