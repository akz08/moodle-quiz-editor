require "builder"

module QuizEditor
  module Helpers
    module GenerateMoodleXmlHelper
      def generate_moodle_xml(category)
        xml = Builder::XmlMarkup.new( :indent => 2)
        xml.instruct! :xml, :encoding => "UTF-8"

        xml.quiz do
          # dummy question to specify category for import
          xml.comment! "question: 0"
          xml.tag!("question", {"type"=>"category"}) do
            xml.category { xml.text "$course$/#{category.c_name}"}
          end

          category.questions.all.each do |q|

            xml.comment! "question: #{q.id}"

            xml.tag!("question", {"type"=>"#{convert_type_to_moodle(q.q_type)}"}) do
              xml.name {xml.text "#{q.q_name}"}
              xml.tag!("questiontext", {"format"=>"html"}) do
                xml.text {xml.cdata! "#{q.q_body}"}
              end
              # dummy data not currently available to input via editor
              xml.tag!("generalfeedback", {"format"=>"html"}) {xml.text ""}
              xml.defaultgrade "1.0000000"
              xml.penalty "1.0000000"
              xml.hidden "0"
              # iterate through answers
              q.answers.each do |a|
                xml.tag!("answer", {"fraction"=>"#{a.a_fraction}", "format"=>"moodle_auto_format"}) do
                  xml.text "#{a.a_answer}"
                  xml.tag!("feedback", {"format"=>"html"}) do
                    xml.text ""
                  end
                end
              end
            end
          end
          # scaffold for basic question data
          # xml.comment! "question: 0"
          # xml.tag!("question", {"type"=>"true_false"}) do
          #   xml.name { xml.text "name"}
          #   xml.questions { xml.text "#{category.questions.all}"}
          #   xml.answers { xml.text "#{category.questions.first.answers.all}"}
          # end

        end
      end

      ## insert other methods here ##
      def convert_type_to_moodle(question_type) 
        # hash to convert types
        question_hash = {"multiple_choice" => "multichoice", "true_false" => "truefalse"}

        # Remaining Moodle question types to be implemented
        # valid_types.concat( ["calculated", "description", "essay", "matching", 
        # "embedded_answers", "short_answer", "numerical"] )

        question_hash[question_type]
      end
    end
  end
end    
